if (response.length !== 0) {
                console.log(response.group)
                return response.group.map((group, index) => {
                    return (
                        <Grid item xs={12} key={index}>
                            <form onSubmit={(event) => this.updatedGroup(event, index)}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="name">{group.name}</InputLabel>

                                    <Input id="name" name="name" autoFocus onChange={this.handleChange} />
                                </FormControl>

                                <Button variant="contained"
                                color="primary"
                                type="submit">
                                    Update Group
                                </Button> 
                            </form>
                        </Grid>
                    )
                })
            }
        })