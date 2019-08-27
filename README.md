# README

## userテーブル

Column|Type|Options|
|------|----|-------|
|name|sring|null: false|
|E-mail|string|null: false|
|password||string|null: false|

### Association
- has_many :groups_users
- has_many :groups,through::groups_users
- has_many :comments

## groupテーブル

Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :groups_users
- has_many :users,through::groups_users
- has_many :comments

## commentテーブル

Column|Type|Options|
|------|----|-------|
|text|text|
|img|text|
|user_id|integer|foreign_key: true|
|group_id|integer|foreign_key: true|

### Association
- belongs_to :user
- belons_to :group

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
