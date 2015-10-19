class ListSerializer < ActiveModel::Serializer
  # embed :ids, include: true
  attributes :id, :title, :description, :user
  has_many :list_items
end
