class NotesController < ApplicationController
    def index 
        notes = Note.all
        render json: NoteSerializer.new(notes)
    end 

    def show
        note = Note.find_by(id: params[:id])
        options = {
    include: [:user]
    }
        render json: NoteSerializer.new(note, options)
    end

    def destroy
        note = Note.find_by(id: params[:id])
        note.destroy
        render json: note
    end
end
