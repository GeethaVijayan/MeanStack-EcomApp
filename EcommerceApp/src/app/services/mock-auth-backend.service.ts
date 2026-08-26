import { Injectable } from '@angular/core';

// Mock data store for registered users
const MOCK_USERS: any[] = [];

@Injectable({
  providedIn: 'root'
})
export class MockAuthBackendService {
  
  register(email: string, password: string, name: string): { token: string; user: any } {
    // Check if user already exists
    if (MOCK_USERS.find(u => u.email === email)) {
      throw new Error('User already exists');
    }

    // Create new user
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role: 'user',
      createdAt: new Date()
    };

    // Generate mock JWT token
    const token = this.generateMockToken(user);

    // Store user
    MOCK_USERS.push({ ...user, password });

    return { token, user };
  }

  login(email: string, password: string): { token: string; user: any } {
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const token = this.generateMockToken(user);
    return { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
  }

  private generateMockToken(user: any): string {
    // Simple base64 encoded mock JWT
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ 
      sub: user.id, 
      email: user.email, 
      name: user.name,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600
    }));
    const signature = btoa('mock-signature');
    return `${header}.${payload}.${signature}`;
  }
}
