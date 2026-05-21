import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";
import { pool } from "./db";

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
  getAllSessions(): Promise<Array<SavedSession & { messageCount: number }>>;
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

  async getAllSessions() {
    return Array.from(this.sessions.values()).map((s) => ({
      ...s,
      messageCount: s.messages.length,
    }));
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const res = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return res.rows[0] ?? undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const res = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return res.rows[0] ?? undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const res = await pool.query(
      "INSERT INTO users (id, username, password) VALUES ($1, $2, $3) RETURNING *",
      [id, insertUser.username, insertUser.password]
    );
    return res.rows[0];
  }

  async saveSession(data: Omit<SavedSession, "token" | "savedAt">): Promise<SavedSession> {
    const token = randomUUID();
    const savedAt = Date.now();
    await pool.query(
      `INSERT INTO saved_sessions (token, email, tool_id, tool_path, tool_label, messages, saved_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [token, data.email, data.toolId, data.toolPath, data.toolLabel, JSON.stringify(data.messages), savedAt]
    );
    return { ...data, token, savedAt };
  }

  async getSession(token: string): Promise<SavedSession | undefined> {
    const res = await pool.query("SELECT * FROM saved_sessions WHERE token = $1", [token]);
    if (!res.rows[0]) return undefined;
    const row = res.rows[0];
    return {
      token: row.token,
      email: row.email,
      toolId: row.tool_id,
      toolPath: row.tool_path,
      toolLabel: row.tool_label,
      messages: row.messages,
      savedAt: Number(row.saved_at),
    };
  }

  async getAllSessions() {
    const res = await pool.query(
      "SELECT token, email, tool_id, tool_path, tool_label, messages, saved_at FROM saved_sessions ORDER BY saved_at DESC"
    );
    return res.rows.map((row) => ({
      token: row.token,
      email: row.email,
      toolId: row.tool_id,
      toolPath: row.tool_path,
      toolLabel: row.tool_label,
      messages: row.messages,
      savedAt: Number(row.saved_at),
      messageCount: Array.isArray(row.messages) ? row.messages.length : 0,
    }));
  }
}

export const storage = new DatabaseStorage();
