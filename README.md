Test project for Issue https://github.com/meteor/meteor/issues/1592

Helper in {{#each}} gets not called for each item, when increased by limit.
Related issue: https://github.com/meteor/meteor/issues/1610

Steps to reproduce:

1. Click the increase button, the items will increase by 10 (and the isHelperCalled is called 20 times, see bug #1599)
2. press the rerun helper button, it will re-run the isHelperCalled 20 times (like it should)
3. increase by another 10 items
4. repeat step 2. this times it will again run only 20 times the isHelperCalled when in fact it should be 30 times!

Which is not so visible in this test, but visible in my project, is that he runs the helper from item 1-10 and 20-30, when there are 30 items (so leaves out the before add ones)