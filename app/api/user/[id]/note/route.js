import connect from "@/utils/db";
import Note from "@/models/note";
import { NextResponse } from "next/server";

// Get Notes
export const GET = async (request, { params }) => {
    try {
      await connect();
  
      const notes = await Note.find({ author: params.id }).sort({createdAt:-1});
  
      return new NextResponse(JSON.stringify(notes), { status: 200 });
    } catch (error) {
      return new NextResponse(error, { status:500 });
    }
  };
