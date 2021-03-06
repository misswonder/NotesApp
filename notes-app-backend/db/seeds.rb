# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Note.destroy_all
User.destroy_all

user_1 = User.create(username: "Jade McDaniels")
user_2 = User.create(username: "Yvonne Chen")
user_3 = User.create(username: "Jane Doe")

note_1 = Note.create(title: "grocery", content: "bread, milk, egg", user_id: user_1.id)
note_2 = Note.create(title: "errands", content: "post office run, UPS store pick up", user_id: user_2.id)
note_3 = Note.create(title: "potential pet names", content: "Lola, Drax, Venus", user_id: user_3.id)