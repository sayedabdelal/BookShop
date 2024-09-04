from backend import db


class Wishlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'))

    def to_dict(self):
        return {'id': self.id, 'user_id': self.user_id, 'book_id': self.book_id}
