import React from 'react';
import { Dimensions } from 'react-native';
import {
    Svg,
    Defs,
    LinearGradient,
    Stop,
    Rect,
    Mask
} from 'react-native-svg';
import Logo from '../assets/Splash-Screen.svg';

const { width, height } = Dimensions.get('window');

export default function GradientLogo() {
    return (
        <Svg width={width} height={height} viewBox="0 0 W H">
            <Defs>
                {/* 1) Ton dégradé */}
                <LinearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0%" stopColor="#87CEEB" />
                    <Stop offset="100%" stopColor="#FFFFFF" />
                </LinearGradient>

                {/* 2) Le masque : on importe ton Logo en blanc, il définit la forme */}
                <Mask id="maskLogo">
                    <Logo
                        width={width}
                        height={height}
                        // on force tout en blanc pour que le masque fonctionne
                        fill="#FFF"
                    />
                </Mask>
            </Defs>

            {/* 3) On dessine un rectangle plein écran, rempli du gradient,
            et masqué par la forme du logo */}
            <Rect
                width={width}
                height={height}
                fill="url(#grad1)"
                mask="url(#maskLogo)"
            />
        </Svg>
    );
}
