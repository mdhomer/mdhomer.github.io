Creating a clickable popup table-top element - Godot:


1. Create Area2D node in Scene UI.
2. Add a CollisionShape2D node as a child of the base Area2D node.
3. Within the CollisionShape2D inspector UI editor add a New "Shape" instance... with a shape that matches the item you are trying to mimc.
4. 

5. Attach a script to the Area2D node, for writing our clickable element.


### Writing the attached gd script


#### Register mouse "entered/exited" into Area2D
```
var mouse_over : bool = false

func _mouse_over(over):
	if(over):
		print("mouse_entered")
	else:
		print("mouse_exited")
	self.mouse_over = over

func _ready():
	_start_position = self.position
	connect("mouse_entered", self, "_mouse_over", [true])
	connect("mouse_exited",  self, "_mouse_over", [false])
```

#### Register "pressed"/"released" on Area2D
```
var mouse_over : bool = false

func _mouse_over(over):
	self.mouse_over = over

func _ready():
	_start_position = self.position
	connect("mouse_entered", self, "_mouse_over", [true])
	connect("mouse_exited",  self, "_mouse_over", [false])

func _unhandled_input(event):
	if mouse_over and event is InputEventMouseButton and event.button_index == BUTTON_LEFT:
		if event.pressed:
			print("Pressed")
		else:
			print("Released")
		# get_tree().set_input_as_handled()
```

#### Popup Area2D abruptly
```
var _start_position : Vector2
const _popup_offset : Vector2 = Vector2(0, 150)
var mouse_over : bool = false
var _popped    : bool = false

func _mouse_over(over):
	self.mouse_over = over

func _ready():
	_start_position = self.position
	connect("mouse_entered", self, "_mouse_over", [true])
	connect("mouse_exited",  self, "_mouse_over", [false])

func _unhandled_input(event):
	if mouse_over and event is InputEventMouseButton and event.button_index == BUTTON_LEFT:
		if event.pressed:
			print("Pressed")
			self._popup()
		else:
			print("Released")
		# get_tree().set_input_as_handled()

func _popup():
	var offset : Vector2 = _popup_offset * -1
	if _popped:
		offset = _popup_offset
	self.position = self.position + offset
	_popped = not _popped
```

#### Using Tween node to perform a smooth popup animation
```
extends Area2D

var _start_position : Vector2
const _popup_offset : Vector2 = Vector2(0, 150)
var mouse_over : bool = false
var _popped    : bool = false
var _spawn_tween = Tween.new()
var _popup_duration_s : float = 0.25

func _mouse_over(over):
	self.mouse_over = over

func _ready():
	add_child(_spawn_tween)
	
	_start_position = self.position
	connect("mouse_entered", self, "_mouse_over", [true])
	connect("mouse_exited",  self, "_mouse_over", [false])

func _unhandled_input(event):
	if _spawn_tween.is_active():
		return
	if mouse_over and event is InputEventMouseButton and event.button_index == BUTTON_LEFT:
		if event.pressed:
			print("DocumentSleeve clicked")
			self._popup()
		get_tree().set_input_as_handled()

func _popup():
	var offset : Vector2 = _popup_offset * -1
	if _popped:
		offset = _popup_offset

	_spawn_tween.interpolate_property(self, "position", 
			self.position, 
			self.position + offset, 
			_popup_duration_s, 
			Tween.TRANS_LINEAR, Tween.EASE_OUT)
	_spawn_tween.start()

	_popped = not _popped
```
