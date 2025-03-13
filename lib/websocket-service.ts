export class WebSocketService {
    private ws: WebSocket | null = null
    private reconnectAttempts = 0
    private maxReconnectAttempts = 5
    private reconnectTimeout = 3000 // 3 seconds
  
    constructor(private url: string) {}
  
    connect() {
      try {
        this.ws = new WebSocket(this.url)
  
        this.ws.onopen = () => {
          console.log('Connected to WebSocket')
          this.reconnectAttempts = 0
        }
  
        this.ws.onclose = () => {
          console.log('Disconnected from WebSocket')
          this.reconnect()
        }
  
        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error)
        }
  
        this.ws.onmessage = (event) => {
          this.handleMessage(event.data)
        }
      } catch (error) {
        console.error('WebSocket connection error:', error)
        this.reconnect()
      }
    }
  
    private reconnect() {
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++
        setTimeout(() => {
          console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`)
          this.connect()
        }, this.reconnectTimeout)
      }
    }
  
    private handleMessage(data: any) {
      try {
        const message = JSON.parse(data)
        // Handle different message types
        switch (message.type) {
          case 'chat':
            // Handle chat message
            break
          case 'status':
            // Handle status update
            break
          default:
            console.log('Unknown message type:', message)
        }
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }
  
    sendMessage(message: any) {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(message))
      } else {
        console.error('WebSocket is not connected')
      }
    }
  
    disconnect() {
      if (this.ws) {
        this.ws.close()
      }
    }
  }