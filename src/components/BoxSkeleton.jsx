import {Avatar, Box, Skeleton, Typography} from "@mui/material";

export const BoxSkeleton = () => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', rowGap: '1em'}}>
            <Box sx={{display: 'flex', alignItems: 'center', columnGap: "1em"}}>
                <Skeleton variant={'circular'}>
                    <Avatar/>
                </Skeleton>
                <Skeleton width="100%">
                    <Typography>.</Typography>
                </Skeleton>
            </Box>
            <Skeleton variant="rectangular" sx={{height: '300px'}}>
            </Skeleton>
        </Box>
    );
};

