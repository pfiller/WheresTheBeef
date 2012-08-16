class WheresTheBeef

	body_height: 0
	dom_modify_timeout: null
	comments: null

	constructor: () ->
		document.addEventListener('DOMContentLoaded', @setup, false)

	setup: () =>
		@show_the_beef() if @find_the_filler()
		document.addEventListener('DOMSubtreeModified', @dom_modified, false)

	find_the_filler: () ->
		elementList = document.querySelectorAll(window.filler_selector_list.join(', '))

		for element in elementList
			element.depth = @_node_depth element
			@comments = element if not @comments || element.depth < @comments.depth

		@comments

	show_the_beef: () ->
		@body_height = document.body.clientHeight

		ratio = window.innerHeight/@body_height
		start = Math.ceil(ratio * @comments.offsetTop)
		end = window.innerHeight - start

		@build_the_beef() if not @display
		
		@filler.style.top = "#{start}px"
		@filler.style.height = "#{end}px"

	build_the_beef: () ->
		@beef = document.createElement 'div'
		@beef.className = "howlong-container"

		@filler = document.createElement 'div'
		@filler.className = "howlong-comments"

		@beef.appendChild @filler

		document.body.appendChild @beef

	handle_resize_check: () =>
		@show_the_beef() if document.body.clientHeight != @body_height

	dom_modified: () =>
		window.clearTimeout @dommodify_timeout if @dommodify_timeout
		@dommodify_timeout = window.setTimeout @handle_resize_check, 500

	_node_depth: (element) ->
		if element.parentNode then 1 + @_node_depth(element.parentNode) else 0

new WheresTheBeef()