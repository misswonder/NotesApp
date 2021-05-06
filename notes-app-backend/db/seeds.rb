# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Note.destroy_all
User.destroy_all


user_1 = User.create(username: "Jade")
user_2 = User.create(username: "Yvonne")


note_1 = Note.create(title: "groceries", content: "bread, milk, egg", user_id: user_1.id)
note_2 = Note.create(title: "potential pet names", content: "Lola, Drax, Venus", user_id: user_1.id)
note_3 = Note.create(title: "car care", content: "oil change", user_id: user_1.id)
note_4 = Note.create(title: "errands", content: "post office run, UPS store pick up", user_id: user_1.id)
note_5 = Note.create(title: "dog care", content: "bath and nails", user_id: user_1.id)
note_6 = Note.create(title: "furnitures", content: "dining table, sofa", user_id: user_1.id)
note_7 = Note.create(title: "meetings", content: "stand up, one on one, stand down", user_id: user_1.id)
note_8 = Note.create(title: "foods", content: "sushi, ramen, KBBQ, hotpot", user_id: user_1.id)
note_9 = Note.create(title: "places", content: "Japan, London, New Zealand", user_id: user_2.id)
note_10 = Note.create(title: "code review", content: "JS, Ruby, Python", user_id: user_2.id)
note_11 = Note.create(title: "interivew tips", content: "smile, clam, confident", user_id: user_2.id)
note_12 = Note.create(title: "wine testing", content: "Napa, Spain, Australia", user_id: user_2.id)
note_13 = Note.create(title: "errands", content: "laundry, garden", user_id: user_2.id)
note_14 = Note.create(title: "self care", content: "haircut, nails", user_id: user_2.id)
note_15 = Note.create(title: "groceries", content: "avocados, oalty, bananas", user_id: user_2.id)
note_16 = Note.create(title: "code exam", content: "JS code challenge", user_id: user_2.id)




