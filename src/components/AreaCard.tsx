
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export type DetailItem = {
  label?: string;
  value: string;
  image?: ImageSourcePropType;
  isTitle?: boolean;
};

export interface AreaCardProps {
  header: string;
  details: DetailItem[];
  sideIcon?: React.ReactNode;
  buttonLabel?: string;
  onButtonPress?: () => void;
  onPress?: () => void;
}

const AreaCard: React.FC<AreaCardProps> = ({
  header,
  details,
  sideIcon,
  buttonLabel,
  onButtonPress,
  onPress,
}) => {
  const Container: any = onPress ? TouchableOpacity : View;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>{header}</Text>
      <Container style={styles.card} onPress={onPress} activeOpacity={0.8}>
        {/* Détails */}
        {details.map((item, index) => (
          <View style={styles.detailRow} key={index}>
            {item.label && (
              <Text style={styles.label}>{item.label}</Text>
            )}
            <View style={styles.valueContainer}>
              {item.image && <Image source={item.image} style={styles.avatar} />}
              <Text style={[styles.value, item.isTitle && styles.titleValue]} numberOfLines={1}>
                {item.value}
              </Text>
            </View>
          </View>
        ))}

        {/* Bouton d'action (optionnel) */}
        {buttonLabel && onButtonPress && (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={onButtonPress} activeOpacity={0.7}>
              <Text style={styles.buttonText}>{buttonLabel}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Icône décorative sur le côté */}
        {sideIcon && <View style={styles.sideIcon}>{sideIcon}</View>}
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 15,
    width: '100%',
  },
  header: {
    fontFamily: 'Raleway',
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  card: {
    width: '100%',
    // maxWidth: 344,
    // minHeight: 140,    // taille minimale, la carte s’agrandit si besoin
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 8,
    paddingHorizontal: 20,
    position: 'relative',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  detailRow: {
    flexDirection: 'column',
   // alignItems: 'center',
    justifyContent: 'flex-start', // <- force l’alignement gauche
    marginBottom: 10,
  },
  label: {
       marginBottom:3,           // ← petit écart entre label et valeur
       fontFamily: 'Raleway',
        fontSize: 12,
        fontWeight: '400',
        color: '#666',
      },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 2,              // <- on retire pour que ça prenne juste la place nécessaire
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  value: {
    fontFamily: 'Raleway',
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  titleValue: {
    fontFamily: 'Raleway',
    fontWeight: '800',
    fontSize: 20,
  },
  footer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  button: {
    width: 98,
    height: 31,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2691A3',
  },
  buttonText: {
    fontFamily: 'Raleway',
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  sideIcon: {
    position: 'absolute',
    right: 40,
    top: '65%',
    transform: [{ translateY: -40 }], // pour centrer verticalement l'icône
  },
});

export default AreaCard;
