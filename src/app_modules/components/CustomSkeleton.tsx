import { Skeleton, SkeletonProps, createStyles } from '@mantine/core';
import { AccentColor } from '../_global/color';

interface CustomSkeletonProps extends SkeletonProps {
    isLoading?: boolean; 
    className?: string;
}

const useStyles = createStyles((theme) => ({
    skeleton: {
      '&::before': {
        backgroundColor: "#1F5B9E",
      },
      '&::after': {
        backgroundColor: "#0F3055",
      },
    },
}));

const CustomSkeleton: React.FC<CustomSkeletonProps> = ({
    isLoading = true,
    className,
    ...props
}) => {
    const { classes, cx } = useStyles();
    return (
        <Skeleton
            className={cx(classes.skeleton, className)}
            visible={isLoading}
            {...props}
        />
    );
};

export default CustomSkeleton;