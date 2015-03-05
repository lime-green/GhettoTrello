class Card < ActiveRecord::Base
    validates :content, :uniqueness => {:case_sensitive => false}, :length => { minimum: 2, maximum: 255 }, presence: true
    belongs_to :lane
end
