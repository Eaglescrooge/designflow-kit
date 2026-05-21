import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

export interface SavedSession {
  token: string;
  email: string;
  toolId: string;
  toolPath: string;
  toolLabel: string;
  messages: Array<{ role: string; content: string }>;
  savedAt: number;
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveSession(data: Omit<SavedSession, "token" | "savedAt">): Promise<SavedSession>;
  getSession(token: string): Promise<SavedSession | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private sessions: Map<string, SavedSession>;

  constructor() {
    this.users = new Map();
    this.sessions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveSession(data: Omit<SavedSession, "token" | "savedAt">): Promise<SavedSession> {
    const token = randomUUID();
    const session: SavedSession = { ...data, token, savedAt: Date.now() };
    this.sessions.set(token, session);
    return session;
  }

  async getSession(token: string): Promise<SavedSession | undefined> {
    return this.sessions.get(token);
  }
}

export const storage = new MemStorage();
