## Overview

Hello.
It's no secret that with the development of web and mobile technologies, companies began to face problems such as:
* A lot of time is spent on design/development.
* It's very complicated to support lots of existing products.
* There are no general principles in the UI development.

And, as everyone already knows, in these cases, a concept such as a design system can help us. Design systems are essentially collections of rules, constraints, and principles, implemented in design and code.
In the classical sense, the use of the design system allows to:
* Save time on design/development
* Provide itself as a ready-made constructor
* Standardize Interfaces
* Minimize bugs
* Scale itself

All of the above concepts, problems, and their solutions have raised several more interesting questions. For example:
* Imagine a situation when a company decided to completely change its design system. We get a big problem with developing new components, rules, etc.
* For example, I need to have the function of using different design systems in one application ("super white-label" application :))

Thinking about these problems, we came to the conclusion that one of the solutions would be a design system with customizable parameters. We call it “design system for design systems”. In theory, by changing these parameters, you can create or repeat any design system up to the problems of implementing complex components.


## Eva

So, meet, Eva!
In order to make it all work, we initially shared 2 fundamental concepts: **mapping** and **theme**. They are the basis for understanding the whole concept. So let's take a closer look at what it is.

#### Theme

In essence, a theme is a set of variables responsible for the principal colors of system design. For example:

```json
{
    "color-primary-100": "#F2F6FF",
    "color-primary-200": "#D9E4FF",
    "color-primary-300": "#A6C1FF",
    "color-primary-400": "#598BFF",
    "color-primary-500": "#3366FF",
    
    "color-info-100": "#F2F8FF",
    "color-info-200": "#C7E2FF",
    "color-info-300": "#94CBFF",
    "color-info-400": "#42AAFF",
    "color-info-500": "#0095FF"
}
```

As well as semantic variables, which are essentially references to the main ones. For example:

```json
{
    "color-primary-focus": "$color-primary-700",
    "color-primary-hover": "$color-primary-400",
    "color-primary-default": "$color-primary-500",
    "color-primary-active": "$color-primary-600",
    "color-primary-disabled": "$color-primary-200",
    
    "border-success-color-1": "$color-success-500",
    "border-success-color-2": "$color-success-600",
    "border-success-color-3": "$color-success-700",
    "border-success-color-4": "$color-success-800",
    "border-success-color-5": "$color-success-900"
}
```

There are also some rules for constructing a **theme** object:
* It should have 7 basic “scans” of colors (basic, primary, success, info, warning, and danger), 9-11 colors in each, built according to some dependence.
* Each of the “middle” colors (for "scans" in 9 colors - the fifth, for sweeps with 11 - the first and sixth) are built on 6 transparent colors with transparency percentages: 8, 16, 24, 32, 40, 48. For example:

```json
{
    "color-info-100": "#F2F8FF",
    "color-info-200": "#C7E2FF",
    "color-info-300": "#94CBFF",
    "color-info-400": "#42AAFF",
    "color-info-500": "#0095FF",
    "color-info-600": "#006FD6",
    "color-info-700": "#0057C2",
    "color-info-800": "#0041A8",
    "color-info-900": "#002885",

    "color-info-transparent-100": "rgba(0, 149, 255, 0.08)",
    "color-info-transparent-200": "rgba(0, 149, 255, 0.16)",
    "color-info-transparent-300": "rgba(0, 149, 255, 0.24)",
    "color-info-transparent-400": "rgba(0, 149, 255, 0.32)",
    "color-info-transparent-500": "rgba(0, 149, 255, 0.40)",
    "color-info-transparent-600": "rgba(0, 149, 255, 0.48)"
}
```

#### Mapping

**Mapping** is the data structure with which we tried to describe the component: options for its _appearance_, behavior depending on these options, connection with the **theme**. In fact, with the help of **mapping** structure and **theme** object, we can describe almost any design system with great accuracy.

In order to understand how it works, we need to explain concepts such as:
* _Meta_
* _State_
* _Appearance_
* _Variant Group_
* _Variant_
* _Token_

##### Token

A _token_ is a key-value pair, where the key is most often the name of a certain _style_ that the component knows about, and the value is most often either a key from a _theme_ object or a numerical or string value. For example:

```json
{
    "borderRadius": 3,
    "textColor": "text-basic-color",
    "iconTintColor": "transparent"
}
```

##### Appearance

_Appearance_ - a description of how the component currently looks. Fundamental structure. It includes default styles (_tokens_), all _states_, _variant groups_, _variants_. _Appearance_ names are usually chosen according to semantic meaning (for example: filled, outline, noIndicator, ...). Only one _appearance_ can be applied to a component at a time. Example:

```json
{
    "default": {
        "mapping": {
            "state": {}
        },
        "variantGroups": {
            "status": {
                "primary": {},
                 "info": {}
            }
        }
    }
}
```

##### State

_State_ describes how component styles change during user interaction. It can be either _interaction states_ (active, hover, focus, indeterminate), or describing the internal _state_ of the component (visible, checked, disabled, etc.) The _states_ have a predefined priority, depending on which the order of applying and overriding of styles (_tokens_) will be determined. Example:

```json
{
    "state": {
        "checked": {
            "iconTintColor": "text-control-color"
        },
        "indeterminate": {
            "iconTintColor": "text-control-color",
            "iconHeight": 3,
            "iconBorderRadius": 1.5
        },
        "disabled": {
            "borderColor": "color-basic-transparent-300",
            "backgroundColor": "color-basic-transparent-100",
            "textColor": "color-basic-transparent-600"
        },
        "checked.disabled": {
            "borderColor": "color-basic-transparent-600",
            "backgroundColor": "color-basic-transparent-600",
            "textColor": "color-basic-transparent-600"
        }
    }
}
```

##### Variant Group

_Variant group_ - a group of _variants_, united by meaning. For example _Variant Group_ - “size”, _variants_ - “small”, “medium”, “big”, etc.

##### Variant

_Variant_ is a description of the component styles that are responsible for the appearance of the component that has this option (for example size = ”big”, status = ”warning”). Each option can also describe _states_ whose styles (_tokens_) will replace (override) the default ones when applying this _variant_. One _variant_ from each of the described semantic _variant groups_ can be applied to a component at one time. Example: 

```json
{
    "small": {
        "minHeight": 32,
        "minWidth": 32,
        "paddingHorizontal": 8,
        "paddingVertical": 8,
        "textFontSize": 12,
        "textLineHeight": 16,
        "textFontWeight": "bold",
        "textMarginHorizontal": 8,
        "iconWidth": 16,
        "iconHeight": 16,
        "iconMarginHorizontal": 8
    }
}
```

##### Meta

This is meta-information, which indicates:
* Scope. It can be: "all", "mobile" or "web".
* Parameters are the names and their types of all _tokens_ that will be used in the component.
* A List of all _states_ with integer priorities.
* A List of all _appearances_ with default one.
* A list of all _Variant Groups_ and _Variants_ in them with an optional default indication.
For example:

```json
{
    "meta": {
        "scope": "mobile",
        "parameters": {
          "minHeight": {
            "type": "number"
          },
          "paddingVertical": {
            "type": "number"
          },
          "paddingHorizontal": {
            "type": "number"
          },
          "backgroundColor": {
            "type": "string"
          }
        },
        "appearances": {
          "default": {
            "default": true
          },
          "control": {
            "default": false
          }
        },
        "variantGroups": {
          "alignment": {
            "start": {
              "default": true
            },
            "center": {
              "default": false
            }
          }
        },
        "states": {
            "checked": {
                "default": false,
                "priority": 0,
                "scope": "all"
            },
            "disabled": {
                "default": false,
                "priority": 2,
                "scope": "all"
            }
        }
      }
}
```

##### How it works?

Each component all the time knows what it should look like at the moment: what is its _appearance_, _states_ combination, _variants_ combination. The Eva processor transforms the _mapping_ structure into a structure of the following form:

```json
{
    "filled.basic": {
      "backgroundColor": "background-basic-color-3",
      "borderColor": "border-basic-color-3",
      "borderRadius": 4,
      "borderWidth": 1
    },
    "filled.basic.active": {
      "backgroundColor": "color-basic-active",
      "borderColor": "color-basic-active",
      "borderRadius": 4,
      "borderWidth": 1
    },
    "filled.basic.active.focused": {
      "backgroundColor": "color-basic-active",
      "borderColor": "color-basic-focus",
      "borderRadius": 4,
      "borderWidth": 1
    },
    "filled.basic.disabled": {
      "backgroundColor": "color-basic-transparent-300",
      "borderColor": "color-basic-transparent-300",
      "borderRadius": 4,
      "borderWidth": 1
    }
}
```

As we can see, this is a Map in which the keys are a list of what the component can be, according to the description from the _mappings_, and the value is a set of _tokens_ that correspond to the semantic value of the key.
The construction of this map is achieved by the process of overriding styles along the following chain:
Default _tokens appearance_ -> _variant tokens_ -> _state tokens_ (with priority).
Thus, the component “expects” certain tokens and takes on the "shopfront" depending on their description.

##### Example

Based on the above, I propose to make an example of the implementation of the Material design part of the system using the Eva token processing system. To do this, let's make a login screen using the _react-native-ui-kitten_ library, which is designed to work with the Eva design system. In the application, we can see 2 identical screens, the source of the styles for which are different _mapping_ objects and _themes_ (Eva and Material, respectively).

```tsx
{
    // Example
}
```

##### What had to be done on the _theme_

...

##### What had to be done on _mapping_

...



