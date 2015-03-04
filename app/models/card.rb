class Card < ActiveRecord::Base
    validates :content, :uniqueness => {:case_sensitive => false}, :length => { minimum: 1 }, presence: true
    belongs_to :lane
end
