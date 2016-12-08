# repeater

Simple JS library to repeat content in HTML. Useful for quick mockup. Interesting for educational purposes.

## Usage

```html
<div data-repeat="3">repeat!</div>
<!-- will output:
<div>repeat!</div>
<div>repeat!</div>
<div>repeat!</div> -->

<ul>
    <li data-repeat="['one', 'two', 'three']">
    {{#}}
    </li>
    <!-- will output:
    <li>one</li>
    <li>two</li>
    <li>three</li>
    -->    
</ul>

<ul>
	<li
    	data-repeat="[{'url': '/blog', 'title': 'Blog'}, {'url': '/about', 'title': 'About me'}]">
		<a href="{{url}}">{{title}}</a>
    </li>
    <!-- will output:
    <li>
    	<a href="/blog">Blog</a>
	</li>
    <li>
    	<a href="/about">About me</a>
	</li>
    -->
</ul>
```

Licensed under MIT
