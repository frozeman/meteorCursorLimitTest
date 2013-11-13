Test project for Issue https://github.com/meteor/meteor/issues/1592

When using a cursor in an #each helper to render a list it works when increasing the limit, but when passing the cursor in from another template through a handlebars helper, it doesnt calculate the differences correctly and re-renders all items.


Steps to reproduce:

- Run the app wait until its loaded and press the increase limit button.
 -> this wil increase by 10 items, where 10 items will be add and the first 10 wont be re-rendered

- Next, go to the `meteorCursorLimitTest.js` and comment line 9-12 and uncomment line 32-37.
This will insert the collection items AFTER the template gets rendered.
Now try step one again, and it will render 20 items, means the first 10 will be re-renderd as well.