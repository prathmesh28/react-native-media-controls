import React from "react";
import { TouchableOpacity, View, ActivityIndicator, Image, ViewStyle } from "react-native";
import styles from "./MediaControls.style";
import { getPlayerStateIcon } from "./utils";
import { Props } from "./MediaControls";
import { PLAYER_STATES } from "./constants/playerStates";

export type CustomSliderStyle = {
  playButtonStyle: ViewStyle;
};

type ControlsProps = Pick<
  Props,
  "isLoading" | "mainColor" | "playerState" | "onReplay"
> & {
  onPause: () => void;
  customSliderStyle?: CustomSliderStyle;
};

const Controls = (props: ControlsProps) => {
  const { customSliderStyle, isLoading, playerState, onReplay, onPause } = props;
  const icon = getPlayerStateIcon(playerState);
  const pressAction = playerState === PLAYER_STATES.ENDED ? onReplay : onPause;
 
  
  const customPlayButtonStyle = customSliderStyle?.playButtonStyle || {};

  const content = isLoading ? (
    <ActivityIndicator size="large" color="#FFF" />
  ) : (
    <TouchableOpacity
      style={[styles.playButton,customPlayButtonStyle]}
      onPress={pressAction}
      accessibilityLabel={PLAYER_STATES.PAUSED ? "Tap to Play" : "Tap to Pause"}
      accessibilityHint={"Plays and Pauses the Video"}
    >
      <Image source={icon} style={styles.playIcon} />
    </TouchableOpacity>
  );

  return <View style={[styles.controlsRow]}>{content}</View>;
};

export { Controls };
