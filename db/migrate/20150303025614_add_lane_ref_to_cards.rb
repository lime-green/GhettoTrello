class AddLaneRefToCards < ActiveRecord::Migration
  def change
    add_reference :cards, :lane, index: true
    add_foreign_key :cards, :lanes
  end
end
