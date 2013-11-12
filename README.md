Test project for Issue https://github.com/meteor/meteor/issues/1592

When using a cursor in an #each helper to render a list it works when increasing the limit, but when passing the cursor in from another template through a handlebars helper, it doesnt calculate the differences correctly and re-renders all items.