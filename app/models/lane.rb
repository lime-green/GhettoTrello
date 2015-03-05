class Lane < ActiveRecord::Base
    validates :name, :uniqueness => {:case_sensitive => false}, :length => { minimum: 2, maximum: 6 }, presence: true
    has_many :cards, dependent: :destroy
end
