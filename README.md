# Adbutler for GitBook

Integrate adbutler.com ads into a GitBook.

### How to use it?

Configure the plugin in your `book.json`:

```js
{
    "plugins": ["adbutler"],
    "pluginsConfig": {
        "adbutler": {
            "key": "XXXXXX",
            "type": "iframe",
            "defaultZone": "XXXXXX"
        }
    }
}
```

Then in your markdown/asciidoc content, include ads using:

```md
Ad with specific parameters:

{% adbutler zone="167292",size="728x90",id="194796" %}{% endadbutler %}

Ad with default zone and default size:

{% adbutler id="194796" %}{% endadbutler %}
```
