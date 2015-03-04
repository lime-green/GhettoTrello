class AddIndexToLanes < ActiveRecord::Migration
  def change
    add_index :lanes, :name, unique: true
  end
end
