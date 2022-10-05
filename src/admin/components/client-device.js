import React, { useState } from "react";
import {Label, Form} from "reactstrap";
import {Multiselect} from "multiselect-react-dropdown";


const tags = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next",
    "Vue",
    "Nuxt",
    "Node",
    "Python",
];

export const TagsMultiSelect = () => {
    const [selectedTags, setSelectedTags] = useState([]);
    const onChange = event => setSelectedTags([...event.value]);

    return (
        <Form className="k-form k-my-8">
            <Label className="k-label k-mb-3">Clients</Label>
            <Multiselect data={tags} value={selectedTags} onChange={onChange} autoClose={false} />
        </Form>
    );
};