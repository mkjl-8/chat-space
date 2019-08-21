# README

## userテーブル

Column|Type|Options|
|------|----|-------|
|name|sring|null: false|
|E-mail|string|null: false|
|password||string|null: false|

### Association
- has_many :groups_users
- has_many :group,through::groups_users
- has_many :comment

## groupテーブル

Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :groups_users
- has_many :user,through::groups_users
- has_many :comment

## commentテーブル

Column|Type|Options|
|------|----|-------|
|text|text|
|img|text|
|user_id|integer|foreign_key: true|
|group_id|integer|foreign_key: true|

### Association
- belongs_to :user
- has_many :group

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
