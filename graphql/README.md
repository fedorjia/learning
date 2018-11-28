# graphql

## add blog post
```
方式一（graphql）
mutation {
  addBlogPost(data: {title: "fedor", description: "hope is a good thing！"})
}

方式二 (postman)：
{
	"query": "mutation ($data: BlogPostInput!) { addBlogPost (data: $data) }",
	"variables": {
		"data": {
			"title": "this is title",
			"description": "this is description"
		}
	}
}

方式三 (postman)：
{
	"query": "mutation { addBlogPost (data: { title: \"this is title1\", description: \"this is description1\" }) }"
}
```


## get blog by id
方式一（graphql）
query {
  blogPost( id: "5bfe9329d90ebf3c3497703c") {
    _id, title, description
  }
}

方式二（postman）
```
{
	"query": "query { blogPost( id: \"5bfe9329d90ebf3c3497703c\") { _id, title, description  } }"
}

方式三（CURL）
curl -X POST \
  http://localhost:8080/graphql \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 93bf8a2c-5f31-4b46-823b-2261b4cc09dd' \
  -d '{
	"query": "query { blogPost( id: \"5a7e792b9fe3dd9f2820ca77\") { _id, title, description  } }"
}'
```


## remove blog by id
方式一（graphql）
mutation {
  removeBlogPost(_id: "5bfe9667472e2c3cdb9357a5") {
    _id, title, description
  }
}
