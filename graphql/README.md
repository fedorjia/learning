# graphql

## add blog post
```
方式一：
{
	"query": "mutation ($data: BlogPostInput!) { addBlogPost (data: $data) }",
	"variables": {
		"data": {
			"title": "this is title",
			"description": "this is description"
		}
	}
}


方式二：
{
	"query": "mutation { addBlogPost (data: { title: \"this is title4\", description: \"this is description4\" }) }"
}
```

## get blog by id
```
{
	"query": "query { blogPost( id: \"5a7e792b9fe3dd9f2820ca77\") { _id, title, description  } }"
}


CURL方式：
curl -X POST \
  http://localhost:8080/graphql \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 93bf8a2c-5f31-4b46-823b-2261b4cc09dd' \
  -d '{
	"query": "query { blogPost( id: \"5a7e792b9fe3dd9f2820ca77\") { _id, title, description  } }"
}'
```