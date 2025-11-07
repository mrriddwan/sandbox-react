import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase.config";
import type { ITask } from "../types/task";

class TaskService {
  private readonly COLLECTION_NAME = "tasks";

  /**
   * Create a new task in Firestore
   */
  async createTask(description: string, userId: string): Promise<string> {
    try {
      const taskData = {
        description,
        is_completed: false,
        is_editing: false,
        userId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, this.COLLECTION_NAME), taskData);
      return docRef.id;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  /**
   * Update a task in Firestore
   */
  async updateTask(taskId: string, updates: Partial<ITask>): Promise<void> {
    try {
      const taskRef = doc(db, this.COLLECTION_NAME, taskId);
      await updateDoc(taskRef, {
        ...updates,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  /**
   * Delete a task from Firestore
   */
  async deleteTask(taskId: string): Promise<void> {
    try {
      const taskRef = doc(db, this.COLLECTION_NAME, taskId);
      await deleteDoc(taskRef);
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }

  /**
   * Get all tasks for a specific user
   */
  async getUserTasks(userId: string): Promise<ITask[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_NAME),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        description: doc.data().description,
        is_completed: doc.data().is_completed,
        is_editing: doc.data().is_editing || false,
      }));
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }
}

export const taskService = new TaskService();

