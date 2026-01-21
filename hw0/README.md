# CS571-S26 HW0: Introductions
In this homework, you will introduce yourself to your classmates using JSON! JSON is short for "JavaScript Object Notation" and it's the primary way that data is communicated over the internet! We will use JSON and its de-serialized counterpart, JS objects, a lot in this class.

## 1. File Creation
Create a file named `me.json` in this directory. Make sure to name it `me.json` and *not* `me.json.txt`.

## 2. About YOU!
In the `me.json` file, you will need to create JSON for an object consisting of...
 - `name`: Your name should be a nested object consisting of...
   - `first`: Your first name as a *string*
   - `last`: Your last name as a *string*
 - `fromWisconsin`: Whether or not you are from Wisconsin as a *boolean*
 - `numCredits`: The number of credits you are taking this semester as a *number*
 - `major`: Your major as a *string*. If you have multiple majors, still use a string, e.g. "Computer Science and Data Science".
 - `interests`: Your interests as an *array* of *strings*. You may have between 0 and 5 interests!

### Special Note

**This information will be used and shared with your classmates in an upcoming assignment.** If you do not feel comfortable sharing this information, *you can make it up!*

### 3. Submission
Add, commit, and push your `me.json` file to your GitHub Classroom repository. Then, zip the `hw0` folder and submit to Gradescope. Autograding tests should complete within a few minutes. Review your results, and submit as many times as you need up until the assignment deadline. 🥳

**Important:** Gradescope expects to find `me.json` within the `hw0` zip. If the file path of `me.json` is not prefixed with `hw0` as below, you will *not* pass the autograder. Other files such as figures and git files can be included, but are ignored by the autograding process.

![A figure showing files are uploaded within a hw0 folder.](_assets/gradescope.png)
