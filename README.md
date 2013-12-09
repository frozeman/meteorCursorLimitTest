Test project for Issue https://github.com/meteor/meteor/issues/1672

Helper in {{#each}} gets not called for all items, when the sorting is changes

Steps to reproduce:

1. Press the change order type button

This will always rerun the testHelper of all items, visible in the console log.