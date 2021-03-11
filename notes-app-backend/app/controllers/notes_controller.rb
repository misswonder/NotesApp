class NotesController < ApplicationController
    def create
        note = Note.create!({ title: permitted_params['title'], content: permitted_params['content'], user: User.find(permitted_params['user_id']) })
    
        options = {
            include: [:user]
        }
        render json: NoteSerializer.new(note, options)
    end

    def index 
        notes = Note.where(user_id: params['user_id'])
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

    def update
        note = Note.find_by(id: params[:id])
        note.update!(permitted_params)
        render json: NoteSerializer.new(note)
    end

    def permitted_params
        params.require(:note).permit(:title, :content, :user_id)
    end
end
