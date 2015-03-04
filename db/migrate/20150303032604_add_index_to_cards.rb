class AddIndexToCards < ActiveRecord::Migration
  def change
    add_index :cards, :content, unique: true
  end
end
