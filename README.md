# Enterprise Income Tracker

This project is a ReactJS refactor of a vanilla HTML, CSS, and JavaScript application. It demonstrates the transition from an imperative, DOM-manipulation approach to a declarative, state-driven architecture using React.

## Overview of the Conversion

The original application relied on direct DOM querying (e.g., `document.getElementById`) and manual HTML string injection to update a ledger table. The React version abstracts the UI layer, relying entirely on React state (`useState`) to automatically sync the user interface with the underlying data.

## Key Architecture Changes

### 1. From DOM Queries to State-Driven Inputs
In vanilla JavaScript, input values were extracted only when a user clicked the save button. In React, we use **Controlled Components**, meaning the inputs continuously sync with a React state variable on every keystroke.

*   **Vanilla JS:** `const catName = document.getElementById("txtCatName").value;`
*   **ReactJS:** 
    ```jsx
    const [catName, setCatName] = useState('');
    // Inside JSX:
    <input value={catName} onChange={(e) => setCatName(e.target.value)} />
    ```

### 2. Replacing HTML Injection with Dynamic Rendering
The original code constructed an HTML string and forcefully injected it into the table using `insertAdjacentHTML`. The React approach stores the categories in an array and uses the `.map()` function to dynamically render the table rows.

*   **Vanilla JS:** 
    ```javascript
    const newRowHTML = `<tr><td>${catName}</td><td>${catDesc}</td></tr>`;
    incomeTableBody.insertAdjacentHTML("beforeend", newRowHTML);
    ```
*   **ReactJS:**
    ```jsx
    {categories.map((category, index) => (
      <tr key={index}>
        <td>{category.name}</td>
        <td>{category.desc}</td>
      </tr>
    ))}
    ```

### 3. Event Handling and Form Submission
Vanilla JavaScript used `addEventListener` to bind click events to the button. React uses **Synthetic Events** attached directly in the JSX. 

To improve accessibility and ensure both mouse clicks and keyboard presses ("Enter") trigger the save function, the React app attaches an `onSubmit` handler to the `<form>` and changes the button type to `"submit"`.

*   **Vanilla JS:** `addCategoryBtn.addEventListener("click", handleAddCategory);`
*   **ReactJS:**
    ```jsx
    <form onSubmit={(e) => { e.preventDefault(); handleAddCategory(); }}>
      {/* Inputs */}
      <button type="submit">Save Category</button>
    </form>
    ```

### 4. DOM Refocusing with `useRef`
After a category is added, the application refocuses the first input field to improve user experience. Since React discourages direct DOM traversal, the `useRef` hook is used to safely target the input node.

*   **Vanilla JS:** `document.getElementById("txtCatName").focus();`
*   **ReactJS:**
    ```jsx
    const catNameRef = useRef(null);
    // After submission:
    catNameRef.current.focus();
    // Inside JSX:
    <input ref={catNameRef} />
    ```

### 5. HTML to JSX Syntax Adjustments
Because JSX is fundamentally JavaScript, standard HTML attributes were updated to avoid conflicts with reserved JavaScript keywords:
*   `class="..."` changed to `className="..."`
*   `for="..."` (on labels) changed to `htmlFor="..."`
*   Self-closing tags were enforced for standalone elements (e.g., `<input />`, `<link />`).

## Getting Started

To run this React component locally:

1. Create a new React project (using Vite or Create React App).
2. Install Bootstrap or add the Bootstrap CDN link to your `index.html` or main layout file.
3. Replace the contents of `App.jsx` with the refactored React code.
4. Run your development server (e.g., `npm run dev` or `npm start`).
