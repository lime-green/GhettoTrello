class AddContentToCard < ActiveRecord::Migration
  def change
    add_column :cards, :content, :text
  end
end
