import { WebSocketServer } from 'ws'
import { createServer } from 'http'

const server = createServer()
const wss = new WebSocketServer({ server })

wss.on('connection', (ws) => {
  console.log('New client connected')

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString())
      
      // Handle different message types
      switch (data.type) {
        case 'chat':
          // Broadcast message to support staff
          // Store in database
          // Send acknowledgment
          break
        
        case 'status':
          // Update client status
          break
        
        default:
          console.log('Unknown message type:', data)
      }
    } catch (error) {
      console.error('Error handling message:', error)
    }
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

server.listen(8080, () => {
  console.log('WebSocket server running on port 8080')
})