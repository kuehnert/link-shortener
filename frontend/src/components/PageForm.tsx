import { Button, TextField } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { isValidShortname, isValidURL } from "../utils/helpers";

function validate(title: string, shortname: string, weburl: string) {
  // true means invalid, so our conditions got reversed
  return {
    shortname: !isValidShortname(shortname),
    title: title.length === 0,
    weburl: !isValidURL(weburl)
  };
}

const initialValues = {
  title: "",
  shortname: "",
  weburl: "https://",
  description: "",
  touched: {
    shortname: false,
    title: false,
    weburl: false
  }
};

const PageForm: React.FC = () => {
  const onChange = ({ target: { id, value } }) => {
    const newValue =
      id === "shortname" ? value.toLowerCase().replace(/\s/, "") : value;
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newpage = (({ shortname, title, description, weburl, hits }) => ({
      shortname,
      title,
      weburl,
      description: description === "" ? null : description,
      hits
    }))(this.state);

    this.props.saveData(newpage);
  };

  const handleBlur = field => () => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  function canBeSubmitted() {
    const errors = validate(
      this.state.title,
      this.state.shortname,
      this.state.weburl
    );

    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  const errors = validate(
    this.state.title,
    this.state.shortname,
    this.state.weburl
  );
  const isDisabled = Object.keys(errors).some(x => errors[x]);

  const shouldMarkError = field => {
    const hasError = errors[field];
    const shouldShow = this.state.touched[field];

    return hasError ? shouldShow : false;
  };

  return (
    <form className="PageForm" onSubmit={this.handleSubmit}>
      <div>
        <TextField
          className="TextField"
          id="shortname"
          label="Kurzname"
          error={shouldMarkError("shortname")}
          value={this.state.shortname}
          onChange={this.onChange}
          margin="normal"
          onBlur={this.handleBlur("shortname")}
          disabled={this.props.oldPage != null}
          autoFocus={true}
          autoComplete="off"
          spellCheck="off"
          fullWidth
        />
      </div>

      <div>
        <TextField
          className="TextField"
          id="title"
          label="Seitenname"
          error={shouldMarkError("title")}
          value={this.state.title}
          onChange={this.onChange}
          margin="normal"
          onBlur={this.handleBlur("title")}
          fullWidth
        />
      </div>

      <div>
        <TextField
          className="TextField"
          error={shouldMarkError("weburl")}
          id="weburl"
          label="URL"
          value={this.state.weburl}
          onChange={this.onChange}
          onBlur={this.handleBlur("weburl")}
          margin="normal"
          type="url"
          fullWidth
        />
      </div>

      <div>
        <TextField
          className="TextArea"
          id="description"
          label="Beschreibung"
          value={this.state.description}
          onChange={this.onChange}
          margin="normal"
          multiline
          rows="4"
          fullWidth
        />
      </div>

      {this.props.oldPage && (
        <div>
          <TextField
            className="TextField"
            id="hits"
            label="Klicks"
            value={this.state.hits}
            onChange={this.onChange}
            onBlur={this.handleBlur("hits")}
            margin="normal"
            type="number"
            fullWidth
          />
        </div>
      )}

      <div>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/"
          className="Button"
        >
          Abbrechen
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isDisabled}
          className="Button"
        >
          {this.props.oldPage ? "speichern" : "erstellen"}
        </Button>
      </div>
    </form>
  );
};

export default PageForm;
