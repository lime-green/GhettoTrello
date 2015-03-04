class Lane < ActiveRecord::Base
    validates :name, :uniqueness => {:case_sensitive => false}, :length => { minimum: 1 }, presence: true
    has_many :cards, dependent: :destroy
end
