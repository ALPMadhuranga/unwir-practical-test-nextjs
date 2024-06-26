import Note from "@/models/note";
import connect from "@/utils/db";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

/**GET */
export const GET = async (request, { params }) => {
  try {
    const noteId = params.id;

    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    await connect();

    const note = await Note.findById(noteId);

    if (!note) {
      return new NextResponse("Note not found", { status: 404 });
    }

    const userIdObject = new Types.ObjectId(userId);

    if (!note.author.equals(userIdObject)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return new NextResponse(JSON.stringify(note), { status: 200 });
  } catch (error) {
    return new NextResponse(`Error getting Note: ${error}`, { status: 500 });
  }
};

/**UPDATE */
export const PUT = async (request, { params }) => {
  try {
    const noteId = params.id;

    const { title, description } = await request.json();

    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    await connect();

    const existingNote = await Note.findById(noteId);

    if (!existingNote) {
      return new NextResponse("Note not found", { status: 404 });
    }

    const userIdObject = new Types.ObjectId(userId);

    if (!existingNote.author.equals(userIdObject)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await Note.findByIdAndUpdate(noteId, { title, description }, { new: true });

    return new NextResponse("Successfully updated the note", { status: 200 });
  } catch (error) {
    return new NextResponse(`Error updating Note: ${error}`, { status: 500 });
  }
};

/**DELETE */
export const DELETE = async (request, { params }) => {
  try {
    const noteId = params.id;

    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    await connect();

    const note = await Note.findById(noteId);

    if (!note) {
      return new NextResponse("Note not found", { status: 404 });
    }

    const userIdObject = new Types.ObjectId(userId);

    if (!note.author.equals(userIdObject)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await Note.findByIdAndDelete(noteId);

    return new NextResponse("Note deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse(`Error deleting Note: ${error}`, { status: 500 });
  }
};
