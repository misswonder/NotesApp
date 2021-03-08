class NoteSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :content, :created_at 
  belongs_to :user
end
