import React from "react";
import PageForm from "./PageForm";

const PageEdit: React.FC = () => {
  if (this.props.data.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Seite bearbeiten</h3>

      <PageForm oldPage={this.props.data.getPage} saveData={this.updatePage} />
    </div>
  );
};

export default PageEdit;
