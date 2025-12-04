import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export function middleware(request) {
  try {
    // Create timestamp in ISO format
    const timestamp = new Date().toISOString();
    
    // Extract method and URL
    const method = request.method;
    const url = request.url;
    
    // Format log entry
    const logEntry = `${timestamp} - ${method} ${url}\n`;
    
    // Ensure logs directory exists
    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    
    // Append to log file
    const logPath = path.join(logsDir, 'game.log');
    fs.appendFileSync(logPath, logEntry);
  } catch (error) {
    // Fall back to console logging if file logging fails
    console.error('Logging error:', error);
    console.log(`${new Date().toISOString()} - ${request.method} ${request.url}`);
  }
  
  return NextResponse.next();
}

// Configure which routes to log
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
