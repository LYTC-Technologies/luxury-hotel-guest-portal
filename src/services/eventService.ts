/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Server-Sent Events (SSE) Service for Real-time Updates

const API_BASE_URL = 'https://lytc-hotel-backend.onrender.com';

export interface SseEvent {
  id?: string;
  event?: string;
  data: string;
  retry?: number;
}

export type EventCallback = (event: SseEvent) => void;
export type ErrorCallback = (error: Event) => void;

class EventSourceService {
  private eventSource: EventSource | null = null;
  private callbacks: Map<string, Set<EventCallback>> = new Map();
  private errorCallback: ErrorCallback | null = null;

  /**
   * Subscribe to SSE events
   * @param lastEventId - Optional last event ID for resuming from last position
   * @returns Promise that resolves when connection is established
   */
  public subscribe = async (lastEventId?: string): Promise<void> => {
    // Close existing connection if any
    this.disconnect();

    const url = new URL(`${API_BASE_URL}/api/events/subscribe`);
    
    const headers: Record<string, string> = {};
    if (lastEventId) {
      headers['Last-Event-ID'] = lastEventId;
    }

    // Add auth token if available
    const token = localStorage.getItem('accessToken');
    if (token) {
      url.searchParams.append('token', token);
    }

    // Create EventSource with custom headers workaround
    // Note: EventSource doesn't support custom headers directly,
    // so we pass the token as a query parameter
    this.eventSource = new EventSource(url.toString());

    this.eventSource.onopen = () => {
      console.log('SSE connection established');
    };

    this.eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      if (this.errorCallback) {
        this.errorCallback(error);
      }
    };

    this.eventSource.onmessage = (event) => {
      this.handleEvent({
        data: event.data,
        lastEventId: event.lastEventId,
      });
    };
  };

  /**
   * Disconnect from SSE stream
   */
  public disconnect = (): void => {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      console.log('SSE connection closed');
    }
  };

  /**
   * Register callback for specific event type
   * @param eventType - Event type to listen for (or '*' for all events)
   * @param callback - Callback function to handle the event
   */
  public on = (eventType: string, callback: EventCallback): void => {
    if (!this.callbacks.has(eventType)) {
      this.callbacks.set(eventType, new Set());
    }
    this.callbacks.get(eventType)!.add(callback);
  };

  /**
   * Remove callback for specific event type
   * @param eventType - Event type to remove callback from
   * @param callback - Callback function to remove
   */
  public off = (eventType: string, callback: EventCallback): void => {
    const callbacks = this.callbacks.get(eventType);
    if (callbacks) {
      callbacks.delete(callback);
      if (callbacks.size === 0) {
        this.callbacks.delete(eventType);
      }
    }
  };

  /**
   * Set error callback
   * @param callback - Error callback function
   */
  public onError = (callback: ErrorCallback): void => {
    this.errorCallback = callback;
  };

  /**
   * Handle incoming SSE event
   * @param event - Raw SSE event
   */
  private handleEvent = (event: { data: string; lastEventId?: string }): void => {
    const sseEvent: SseEvent = {
      data: event.data,
      id: event.lastEventId,
    };

    // Try to parse event data if it's JSON
    try {
      const parsedData = JSON.parse(event.data);
      if (parsedData.event) {
        sseEvent.event = parsedData.event;
        sseEvent.data = parsedData.data || event.data;
      }
    } catch (e) {
      // Keep raw data if not JSON
    }

    // Call callbacks for specific event type
    if (sseEvent.event && this.callbacks.has(sseEvent.event)) {
      this.callbacks.get(sseEvent.event)!.forEach((callback) => callback(sseEvent));
    }

    // Call callbacks for all events
    if (this.callbacks.has('*')) {
      this.callbacks.get('*')!.forEach((callback) => callback(sseEvent));
    }
  };

  /**
   * Check if connection is active
   */
  public isConnected = (): boolean => {
    return this.eventSource !== null && this.eventSource.readyState === EventSource.OPEN;
  };
}

// Export singleton instance
export const eventService = new EventSourceService();

// Convenience function to subscribe with event handlers
export const subscribeToEvents = (
  onEvent?: EventCallback,
  onError?: ErrorCallback,
  lastEventId?: string
): Promise<void> => {
  if (onEvent) {
    eventService.on('*', onEvent);
  }
  if (onError) {
    eventService.onError(onError);
  }
  return eventService.subscribe(lastEventId);
};

// Common event types based on API documentation
export const EventTypes = {
  ORDER_CREATED: 'order.created',
  ORDER_UPDATED: 'order.updated',
  ORDER_CANCELLED: 'order.cancelled',
  STAY_CREATED: 'stay.created',
  STAY_CHECKED_IN: 'stay.checked_in',
  STAY_CHECKED_OUT: 'stay.checked_out',
  ROOM_STATUS_CHANGED: 'room.status_changed',
  SPECIAL_ORDER_CREATED: 'special_order.created',
  NOTIFICATION: 'notification',
} as const;
