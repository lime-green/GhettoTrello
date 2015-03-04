class AddNameToLane < ActiveRecord::Migration
  def change
    add_column :lanes, :name, :string
  end
end
