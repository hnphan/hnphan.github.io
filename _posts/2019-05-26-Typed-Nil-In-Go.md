---
layout: post
title: Golang Gotcha - Typed Nil
---

What do you think this code will print?

```go
	var foo interface{}
	fmt.Println(foo == nil)

	var bar *int
	fmt.Println(bar == nil)

	foo = bar
	fmt.Println(foo == nil)
```
This is what it prints:
```go
true
true
false
```
[Run code in Go Playground](https://play.golang.org/p/V-z6ji9Yzp9) 

Let's recap. What _seems_ to be going on here is:
* `foo` is `nil` to start with
* `bar` is `nil`
* After the `foo=bar` assignment, `foo` _seems_ to no longer be `nil` 🤓
 

Did this surprise you? If so, read on and this blog post will clear things up for you 👌.

To understand what's going on here, it's important to understand two bits: how interfaces work, and how the equal comparision `==` works.

## Interfaces, under the surfaces
Under the hood, interfaces in Go have a dynamic type `T` and value `V`. They are set to whatever the _concrete_ type and value the variable ends up being.

When we declare `foo` with `var foo interface{}`, `foo` is a `nil` interface with type `nil` and value `nil`.
When we assign `foo = bar`, `foo` has type `*int` and value `nil`.

You can see it for yourself by running the following code:

```go
	var foo interface{}
	fmt.Printf("%T %v \n", foo, foo)

	var bar *int
	foo=bar
	fmt.Printf("%T %v \n", foo, foo)
```
Which results in:
```go
<nil> <nil> 
*int <nil> 
```
[Run code in Go Playground](https://play.golang.org/p/92m7Wi_1Kur)

## Equality, in reality
In our example, when we do `foo == nil`, we are doing an equality comparision between the `interface{}` variable `foo`, and the `nil` literal.

When we compare a variable to literal, the compiler tries to cast the literal to the _declared_ type of the variable. In this case, we are actually comparing `foo` to `interface{}(nil)` 

So how are interfaces compared? According to the [Golang spec](https://golang.org/ref/spec#Comparison_operators):
> Two interface values are equal if they have identical dynamic types and equal dynamic values or if both have value nil.

Let's go back to our original example:

```go
	var foo interface{}
	fmt.Println(foo == nil)

	var bar *int
	fmt.Println(bar == nil)

	foo = bar
	fmt.Println(foo == nil)
```

The first `foo == nil` comparision results in `true` because the `foo` has type `nil` and value `nil`.
After the assignment `foo = bar`, `foo` now has type `*int` and value `nil`.
Now, when we compare `foo == nil`, because of the declared type of `foo` is `interface{}`, we are still comparing `foo` to `interface{}(nil)`. However `foo`'s dynamic type is now `*int`. Which means the comparision now results in `false`.

To reinforce our understanding, let's explicitly compare `foo` to `(*int)(nil)`:
```go
	var foo interface{}
	fmt.Println(foo == nil)

	var bar *int
	fmt.Println(bar == nil)

	foo = bar
	fmt.Println(foo == nil)
	
	fmt.Println(foo == (*int)(nil))
```
```go
true
true
false
true
```

## Why is all this important, tho?
If your function returns an interface type and you depend on the nil check, for example, checking if the returned error is nil or not, be extra careful.

The Golang FAQ has a really [great example](https://golang.org/doc/faq#nil_error):

```go
func returnsError() error {
	var p *MyError = nil
	if bad() {
		p = ErrBad
	}
	return p // Will always return a non-nil error.
}
```
If you do `if err := returnsError(); err != nil {}`, you'll be wondering why your function returns a non-nil error all the time.


