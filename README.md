# Cutdown

Cutdown is a minimalistic markup syntax based on the [CommonMark](https://commonmark.org/) spec.
It aims to have a small, consistent set of rules with very few exceptions in order to eliminate ambiguity and to minimize edge cases.

Cutdown implements many of the ideas presented in [Beyond Markdown](https://talk.commonmark.org/t/beyond-markdown/2787) by John MacFarlane.

## Cheatsheet

Element | Cutdown
| - | -
Italic | \_italic_
Bold | \*bold*
Code | \`code`
Heading | # Heading 1 <br><br> ## Heading 2 <br><br> ### Heading 3
Blockquote | > blockquote <br><br> or <br><br> >>> <br> blockquote <br> >>>
Unordered List | - item 1 <br> - item 2 <br> - item 3
Ordered List | 1. item 1 <br> 2. item 2 <br> 3. item 3
Horizontal Rule | ---
Link | \[Link](https://example.com/) <br><br> or <br><br> [Link]{1} <br> ⋮ <br> {1}: https://example.com/
Image | !\[Image](example.png) <br><br> or <br><br> !\[Image]{1} <br> ⋮ <br> {1}: example.png
Code Block | \``` <br> codeblock <br> ```

## Inline rules

### Valid inline

As long as the open and closing delimiters are in the same block, any text inside is valid.

```
_text1_

_ text2 _

_te
xt3_

_ _

__
```

Becomes...

```
<em>text1</em>

<em> text2 </em>

<em>te xt3</em>

<em></em>

<em> </em>
```

### Nesting and precedence

Inline elements can be nested but cannot overlap. The first inline that closes takes precedence and any outside delimiters become text.

```
_just *italic_*

_italic with *bold*_

_just *bold*
```

Becomes...

```
<em>just *italic</em>*

<em>italic with <strong>bold</strong></em>

_just <strong>bold</strong>
```

### Line breaks and whitespace

A line break in the same block becomes a space. Several whitespaces in a row get reduced to a single space. Add a backslash `\` + newline to add a hard line break that is in the same block.

```
This is text in a block.
   This text is    in      the same       block.\
This is a hard line break.
```

Becomes...

```
This is text in a block. This text is in the same block.<br>
This is a hard line break.
```

### Link

An inline link is in the form of `[title](url)`. 

```
[link title](https://example.com/)
```

A link URL can be defined in its own block by using a reference link.

```
[link title]{foo}

{foo}: https://example.com/
```

Reference links and their definitions do not depend on each other.

```
[empty link]{foo}

{bar}: https://example.com
```

Becomes...

```
<a>empty link</a>
```

## Block rules

### Paragraphs

Block elements must be separated by an empty line. A block that does not begin with a special character becomes a paragraph.

```
Paragraph 1.
Still paragraph 1.

Paragraph 2.
```

Becomes ...

```
<p>Paragraph 1. Still paragraph 1.</p>
<p>Paragraph 2.</p>
```

### Headings

Headings begin (on the first line only) with 1-6 `#`, followed by a space and then the heading text. Too many hashes will result in a paragraph instead.

```
# Heading 1
Same heading

# Heading 2
# this is invalid

###### Heading 3

########## Too many hashes
```

Becomes...

```
<h1>Heading 1 </h1>
<h2>Heading 2 # this is invalid</h2>
<h6>Heading 3</h6>
<p>########## Too many hashes</p>
```

### Blockquotes

There are two types of blockquotes. The first type begins with a `>` followed by a space and becomes a paragraph inside a blockquote that can only contain inline syntax.

```
> This is a paragraph
inside a *blockquote*

> # This is still a paragraph
```

Becomes...
```
<blockquote>
   <p>This is a paragraph inside a <strong>blockquote</strong></p>
</blockquote>

<blockquote>
   <p># This is still a paragraph</p>
</blockquote>
```

The other type of blockquote is delimited with `>>>` and allows other block-level elements to nest inside of it. If nested blockquotes are needed, you can add more `>` to the containing delimiters.

```
>>>
# This is a heading

This is a paragraph.
>>>

>>>>
>>>
This is a nested blockquote.
>>>
>>>>
```


