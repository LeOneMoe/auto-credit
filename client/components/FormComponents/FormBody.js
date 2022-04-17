import classes from "./Form.module.css"
import Toolbar from "./Toolbar";

const FormBody = ({
                      children,
                      onSubmit,
                      onEdit,
                      onSearch,
                      onDelete,
                      onCreate,
                      searchEnabled = false,
                      createEnabled = false,
                      editEnabled = false,
                      deleteEnabled = false,
                      submitEnabled = false,
                      isSearchMode = false,
                      onDeleteRole,
                  }) => {
    return (
        <form className={classes.form} onSubmit={onSubmit}>
            <Toolbar
                onEdit={onEdit}
                onSearch={onSearch}
                onDelete={onDelete}
                onCreate={onCreate}
                searchEnabled={searchEnabled}
                createEnabled={createEnabled}
                editEnabled={editEnabled}
                deleteEnabled={deleteEnabled}
                submitEnabled={submitEnabled}
                isSearchMode={isSearchMode}
                onDeleteRole={onDeleteRole}
            />

            {children}
        </form>
    )
}

export {FormBody}
